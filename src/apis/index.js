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

// export async function getAttendanceData(course, date) {
//   try {
//     // 로컬 JSON 파일의 URL
//     const url = '/data/attendance.json';

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();

//     // 실제 API를 사용할 때는 필터링 로직을 서버에서 처리하겠지만,
//     // 여기서는 클라이언트 측에서 필요한 데이터를 필터링합니다.
//     // course와 date 매개변수를 사용하여 필터링할 수 있습니다.
//     return data;
//   } catch (error) {
//     console.error('Fetching attendance data failed:', error);
//     throw error;
//   }
// }
