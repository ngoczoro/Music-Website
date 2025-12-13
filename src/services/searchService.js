const API_BASE = "http://localhost:8081/api/common/song";

export async function searchSongs(keyword) {
  if (!keyword || !keyword.trim()) return [];

  const res = await fetch(
    `${API_BASE}/search?keyword=${encodeURIComponent(keyword)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return await res.json(); // List<SongResponse>
}
