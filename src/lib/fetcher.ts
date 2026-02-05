export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Terjadi error saat ambil data.");
    throw error;
  }

  return res.json();
}
