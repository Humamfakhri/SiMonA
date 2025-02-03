export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const device = searchParams.get("device");
  const API_KEY = process.env.ANTARES_API_KEY;
  const APP_NAME = process.env.ANTARES_APP_NAME;

  const endpoint = `https://platform.antares.id:8443/~/antares-cse/antares-id/${APP_NAME}/${device}/la`;
  console.log(`Fetching from: ${endpoint}`); // Harus muncul di terminal (server)

  try {
    const response = await fetch(endpoint, {
      headers: {
        'X-M2M-Origin': API_KEY,
        'Content-Type': 'application/json;ty=4',
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
