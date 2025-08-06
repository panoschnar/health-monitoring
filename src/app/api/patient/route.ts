//GET Patient by id
export async function POST(req: Request) {
    const { access_token, id } = await req.json();
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("API_KEY", `${process.env.API_KEY}`);
    myHeaders.append("Authorization", `Bearer ${access_token}`);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
  
    try {
      const response = await fetch(
        `${process.env.API_URL}/patients/${id}`,
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error(`Error on getting patient: ${response.status}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
      console.error("Error on getting patient:", error);
  
      return new Response(
        JSON.stringify({
          error: "Error on getting patient:",
          message: error.message,
        }),
        { status: 400 }
      );
    }
  }


  //POST Add Patient

export async function PUT(req: Request) {
    try {
      const { frontendData, access_token } = await req.json();
  
      // Validate required fields early
      if (!frontendData || !access_token) {
        return new Response(
          JSON.stringify({ error: "Missing required data" }),
          { status: 400 }
        );
      }
  
      // Ensure birth_date is stringified if it's a Date object
      if (frontendData.birth_date instanceof Date) {
        frontendData.birth_date = frontendData.birth_date.toISOString().split('T')[0];
      }
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("API_KEY", `${process.env.API_KEY}`);
      myHeaders.append("Authorization", `Bearer ${access_token}`);
  
      const response = await fetch(`${process.env.API_URL}/patients`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(frontendData),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({}));
        throw new Error(
          `Backend returned ${response.status}: ${errorDetails?.details || "Unknown error"}`
        );
      }
  
      return new Response(
        JSON.stringify({ status: 200, message: "Patient added successfully" }),
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error on creating Patient:", error);
  
      return new Response(
        JSON.stringify({
          error: "Error on creating Patient",
          message: error.message,
        }),
        { status: 400 }
      );
    }
  }
  
  
  
  