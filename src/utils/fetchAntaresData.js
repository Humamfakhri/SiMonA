export async function fetchAntaresData() {
  const response = await fetch(`https://platform.antares.id:8443/~/antares-cse/antares-id/SiMonA/SiMonA-115749?fu=1&drt=2&ty=4`, {
    headers: {
      'X-M2M-Origin': "575fbcaf7d06dfa0:e6c1f2989e2b3a72",
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  
  const json = await response.json();
  const rawData = json['m2m:list']?.map(item => {
    const content = JSON.parse(item['m2m:cin'].con);
    return {
      timestamp: item['m2m:cin'].ct,  // Example format: 20250122T044846
      ...content,
    };
  });

  console.log(rawData);
  return rawData || [];
}
