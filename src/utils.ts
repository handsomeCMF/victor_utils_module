
export function isSuccess(res: Record<string, any>): boolean {
  if (res.status >= 300 || res.status < 200) {
    return false;
  }
  return true;
}
