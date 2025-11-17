
export async function handler(event, context) {
  try {
    const MAX_WHATSAPP = 10;

    const encodedLinks = [
      "aHR0cHM6Ly93YS5tZS85MTk5MDAyMzk1ODk=",
      "aHR0cHM6Ly93YS5tZS85MTk2MDE4NTAwMDc=",
      "aHR0cHM6Ly93YS5tZS85MTYyMDk2MzQ2NTc=",
      "aHR0cHM6Ly93YS5tZS85MTgzNzA5MTUyOTg=",
      "aHR0cHM6Ly93YS5tZS85MTk5NjY5NzYzNDU=",
      "aHR0cHM6Ly93YS5tZS85MTk5NjY5NzYzNDU=",
      "aHR0cHM6Ly93YS5tZS85MTgwMTg3NTQ2NTk=",
      "aHR0cHM6Ly93YS5tZS85MTcwNzE2ODY3NjQ=",
      "aHR0cHM6Ly93YS5tZS85MTcyMDY1MjIwOTA=",
      "aHR0cHM6Ly93YS5tZS85MTk5MzI4NDM3NzQ=",
      "aHR0cHM6Ly93YS5tZS85MTkwNjg2ODE5ODk=",
      "aHR0cHM6Ly93YS5tZS85MTkwODIzNjM4MTY=",
      "aHR0cHM6Ly93YS5tZS85MTk4ODI2MjU0NzY=",
      "aHR0cHM6Ly93YS5tZS85MTg4OTE0ODE1Nzk=",
      "aHR0cHM6Ly93YS5tZS85MTk4NDUyOTI3NjM=",
      "aHR0cHM6Ly93YS5tZS85MTk2NzY0OTcwMDg=",
      "aHR0cHM6Ly93YS5tZS85MTk0NzQwMTUzODQ=",
      "aHR0cHM6Ly93YS5tZS85MTk3NDk0NjIzNTI=",
      "aHR0cHM6Ly93YS5tZS85MTYyMDk2MzQ2NTc=",
      "aHR0cHM6Ly93YS5tZS85MTg5NjE4NzU5NDc=",
      "aHR0cHM6Ly93YS5tZS85MTk2OTEyMTMzNzI=",
      "aHR0cHM6Ly93YS5tZS85MTYyNjQ4NDU1OTQ=",
      "aHR0cHM6Ly93YS5tZS85MTc2MTkxNzY5NTg=",
      "aHR0cHM6Ly93YS5tZS85MTg1Mjg5MjMyMzg=",
      "aHR0cHM6Ly93YS5tZS85MTYyNjQ4NDU1OTQ=",
      "aHR0cHM6Ly93YS5tZS85MTc4MzcxNTc0ODE=",
      "aHR0cHM6Ly90Lm1lLytMRUw0dm45c3A0NHhaV0Ux"
    ];

    const decoded = encodedLinks.map(l => Buffer.from(l, "base64").toString("utf8").trim());
    const telegram = decoded.find(l => l.includes("t.me"));
    const whatsapps = decoded.filter(l => l.includes("wa.me"));

    const cookie = event.headers.cookie || "";
    let count = 0;
    const match = cookie.match(/shown=(\d+)/);
    if (match) count = parseInt(match[1]);

    if (count >= MAX_WHATSAPP) {
      return {
        statusCode: 302,
        headers: {
          Location: telegram,
          "Set-Cookie": "shown=0; Path=/;"
        }
      };
    }

    const randomWA = whatsapps[Math.floor(Math.random() * whatsapps.length)];

    return {
      statusCode: 302,
      headers: {
        Location: randomWA,
        "Set-Cookie": `shown=${count + 1}; Path=/;`
      }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error"
    };
  }
}
