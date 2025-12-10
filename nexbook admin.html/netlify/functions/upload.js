exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Ye line ab Netlify dashboard se aapki key uthayegi
    const API_KEY = process.env.IMGBB_API_KEY;
    const body = JSON.parse(event.body);

    const formData = new FormData();
    formData.append("image", body.image);

    // ImgBB ko request bhej rahe hain
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Upload failed', details: error.toString() }),
    };
  }
};