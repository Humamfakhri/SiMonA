export default async function handler(req, res) {
  const { device } = req.query; // Ambil parameter device dari query
  const APP_NAME = process.env.ANTARES_APP_NAME;
  const API_KEY = process.env.ANTARES_API_KEY;
  console.log(`https://platform.antares.id:8443/~/antares-cse/antares-id/${APP_NAME}/${device}?fu=1&drt=2&ty=4`);
  
  if (req.method === 'GET') {
    try {
      const response = await fetch(
        `https://platform.antares.id:8443/~/antares-cse/antares-id/${APP_NAME}/${device}?fu=1&drt=2&ty=4`,
        {
          headers: {
            'X-M2M-Origin': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
