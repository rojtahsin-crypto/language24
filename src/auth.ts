// Local auth system - stores accounts in localStorage
// Simulates real auth with email/password and Google

export interface Account {
  uid: string;
  email: string;
  displayName: string;
  password: string; // hashed simulation
  photoURL?: string;
  provider: "email" | "google";
  isPremium: boolean;
  premiumExpiry?: number; // timestamp ms
  createdAt: number;
}

const ACCOUNTS_KEY = "lingua_accounts";
const SESSION_KEY = "lingua_session";

function getAccounts(): Account[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

export function registerWithEmail(email: string, password: string, displayName: string): Account {
  const accounts = getAccounts();
  const existing = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (existing) throw new Error("EMAIL_EXISTS");
  if (password.length < 6) throw new Error("WEAK_PASSWORD");

  const account: Account = {
    uid: `uid_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    email: email.toLowerCase(),
    displayName,
    password: simpleHash(password),
    provider: "email",
    isPremium: false,
    createdAt: Date.now(),
  };
  accounts.push(account);
  saveAccounts(accounts);
  saveSession(account.uid);
  return account;
}

export function loginWithEmail(email: string, password: string): Account {
  const accounts = getAccounts();
  const account = accounts.find(a => a.email.toLowerCase() === email.toLowerCase() && a.provider === "email");
  if (!account) throw new Error("USER_NOT_FOUND");
  if (account.password !== simpleHash(password)) throw new Error("WRONG_PASSWORD");
  saveSession(account.uid);
  return account;
}

export function loginWithGoogle(googleEmail: string, googleName: string, googlePhoto: string): Account {
  const accounts = getAccounts();
  let account = accounts.find(a => a.email.toLowerCase() === googleEmail.toLowerCase() && a.provider === "google");

  if (!account) {
    // Auto-register Google users
    account = {
      uid: `google_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      email: googleEmail.toLowerCase(),
      displayName: googleName,
      password: "",
      photoURL: googlePhoto,
      provider: "google",
      isPremium: false,
      createdAt: Date.now(),
    };
    accounts.push(account);
    saveAccounts(accounts);
  }
  saveSession(account.uid);
  return account;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentSession(): Account | null {
  try {
    const uid = localStorage.getItem(SESSION_KEY);
    if (!uid) return null;
    const accounts = getAccounts();
    return accounts.find(a => a.uid === uid) || null;
  } catch {
    return null;
  }
}

function saveSession(uid: string) {
  localStorage.setItem(SESSION_KEY, uid);
}

export function activatePremium(uid: string, months: number): Account {
  const accounts = getAccounts();
  const idx = accounts.findIndex(a => a.uid === uid);
  if (idx === -1) throw new Error("USER_NOT_FOUND");

  const now = Date.now();
  const currentExpiry = accounts[idx].premiumExpiry || now;
  const base = currentExpiry > now ? currentExpiry : now;
  accounts[idx].isPremium = true;
  accounts[idx].premiumExpiry = base + months * 30 * 24 * 60 * 60 * 1000;

  saveAccounts(accounts);
  return accounts[idx];
}

export function checkPremiumExpiry(uid: string): Account {
  const accounts = getAccounts();
  const idx = accounts.findIndex(a => a.uid === uid);
  if (idx === -1) throw new Error("USER_NOT_FOUND");

  if (accounts[idx].isPremium && accounts[idx].premiumExpiry) {
    if (Date.now() > accounts[idx].premiumExpiry!) {
      accounts[idx].isPremium = false;
      accounts[idx].premiumExpiry = undefined;
      saveAccounts(accounts);
    }
  }
  return accounts[idx];
}

export function formatExpiry(ts: number): string {
  return new Date(ts).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}
