//Bài 6

const matches = [
  { teamA: "A", teamB: "B", scoreA: 2, scoreB: 1 },
  { teamA: "C", teamB: "D", scoreA: 1, scoreB: 3 },
  { teamA: "A", teamB: "C", scoreA: 2, scoreB: 2 },
  { teamA: "B", teamB: "D", scoreA: 0, scoreB: 1 },
  { teamA: "A", teamB: "D", scoreA: 3, scoreB: 1 },
];

//1. Tính số trận thắng, hòa, thua của mỗi đội.
const calculateTeam = (matches) => {
  return matches.reduce((acc, cur) => {
    if (!acc[cur.teamA]) {
      acc[cur.teamA] = { wins: 0, draws: 0, losses: 0 };
    }
    if (!acc[cur.teamB]) {
      acc[cur.teamB] = { wins: 0, draws: 0, losses: 0 };
    }
    if (cur.scoreA > cur.scoreB) {
      acc[cur.teamA].wins++;
      acc[cur.teamB].losses++;
    } else if (cur.scoreA < cur.scoreB) {
      acc[cur.teamA].losses++;
      acc[cur.teamB].wins++;
    } else {
      acc[cur.teamA].draws++;
      acc[cur.teamB].draws++;
    }
    return acc;
  }, {});
};
console.log("Số trận thắng, hòa, thua của mỗi đội:", calculateTeam(matches));

//2. Xếp hạng các đội bóng theo số điểm, với quy tắc:
// + Thắng: +3 điểm
// + Hòa: +1 điểm
// + Thua: +0 điểm
const rankTeams = (matches) => {
  const ranks = matches.reduce((acc, cur) => {
    if (!acc[cur.teamA]) {
      acc[cur.teamA] = { wins: 0, draws: 0, losses: 0, points: 0 };
    }
    if (!acc[cur.teamB]) {
      acc[cur.teamB] = { wins: 0, draws: 0, losses: 0, points: 0 };
    }
    if (cur.scoreA > cur.scoreB) {
      acc[cur.teamA].wins++;
      acc[cur.teamA].points += 3;
      acc[cur.teamB].losses++;
    } else if (cur.scoreA < cur.scoreB) {
      acc[cur.teamA].losses++;
      acc[cur.teamB].wins++;
      acc[cur.teamB].points += 3;
    } else {
      acc[cur.teamA].draws++;
      acc[cur.teamA].points += 1;
      acc[cur.teamB].draws++;
      acc[cur.teamB].points += 1;
    }
    return acc;
  }, {});
  return Object.entries(ranks)
    .map(([team, rank]) => ({ team, ...rank }))
    .sort((a, b) => b.points - a.points);
};
console.log("Xếp hạng các đội bóng theo số điểm", rankTeams(matches));

//3. Tìm đội có số bàn thắng nhiều nhất.
const maxScore = (matches) => {
  const goals = matches.reduce((acc, cur) => {
    acc[cur.teamA] = (acc[cur.teamA] || 0) + cur.scoreA;
    acc[cur.teamB] = (acc[cur.teamB] || 0) + cur.scoreB;
    return acc;
  }, {});
  return Object.entries(goals)
    .map((team, sumGoals) => [team, sumGoals])
    .sort((a, b) => b.sumGoals - a.sumGoals)[0];
};
console.log("Đội có số bàn thắng nhiều nhất:", maxScore(matches));
