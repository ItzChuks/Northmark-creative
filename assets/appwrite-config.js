/* =========================================================
   Northmark Creative — Appwrite configuration
   Fill these in from your Appwrite Console:
   Project Settings → Project ID / API Endpoint
   Databases → your database ID + collection IDs
   Storage → your bucket ID
   ========================================================= */
const APPWRITE_CONFIG = {
  endpoint: "https://cloud.appwrite.io/v1",     // your Appwrite API endpoint
  projectId: "6a528b03002f058ef336",                 // Project Settings → Project ID
  databaseId: "6a528c90002174c16349",               // Databases → your database ID
  documentariesCollectionId: "documentaries",
  communityCollectionId: "community_projects",
  communityBucketId: "6a52924a0018787b682c"
};

const client = new Appwrite.Client()
  .setEndpoint(APPWRITE_CONFIG.endpoint)
  .setProject(APPWRITE_CONFIG.projectId);

const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);
const storage = new Appwrite.Storage(client);
const { ID, Query } = Appwrite;

/* ---- Shared helper: pull a YouTube video ID out of any pasted URL ---- */
function extractYouTubeId(input) {
  if (!input) return null;
  const url = input.trim();
  const patterns = [
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  if (/^[A-Za-z0-9_-]{6,15}$/.test(url)) return url; // already just an ID
  return null;
}
