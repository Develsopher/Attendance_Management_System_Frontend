export const getPlayers = async () => {
  const response = await fetch('/data/players.json');
  const data = await response.json();

  return data.players;
};

export const getCourses = async () => {
  const response = await fetch('/data/courses.json');
  const data = await response.json();

  return data.courses;
};

export const getAttendanceData = async (course, date) => {
  try {
    // 서버의 API 엔드포인트와 요청 형식에 맞춰 URL 구성
    const url = `http://localhost:8080/admin/manage/${course}/${date}`;

    console.log(course, date, url);

    const response = await fetch(url, {
      method: 'GET', // 또는 'POST', 서버 API에 따라 달라짐
      headers: {
        'Content-Type': 'application/json',
        // 필요한 경우 인증 헤더 등 추가
      },
      // POST 요청의 경우 body: JSON.stringify({ course, date }) 등을 추가
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json(); // 응답 데이터를 JSON 형식으로 변환
  } catch (error) {
    console.error('Fetching attendance data failed:', error);
    throw error; // 에러를 다시 throw 하여 호출한 쪽에서 처리할 수 있도록 함
  }
};

export const postAttendanceData = async (dataToSend) => {
  const { cours, data, students } = dataToSend;
  try {
    // 서버의 API 엔드포인트
    const url = `https://your-api-server.com/attendance`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 필요한 경우 인증 헤더 등 추가
      },
      body: JSON.stringify({ course, date }), // 요청 본문에 데이터 포함
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json(); // 응답 데이터를 JSON 형식으로 변환
  } catch (error) {
    console.error('Posting attendance data failed:', error);
    throw error; // 에러를 다시 throw 하여 호출한 쪽에서 처리할 수 있도록 함
  }
};
