export function getUserDetails(type: any): any | null {
  try {
    const raw = localStorage.getItem(type);

    if (!raw || raw === "undefined" || raw === "null") return null;

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setUserDetails(type: any, data: any): void {
  if (!data) {
    localStorage.removeItem(type);
    return;
  }
  localStorage.setItem(type, JSON.stringify(data));
}
