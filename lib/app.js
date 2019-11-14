fetch('http://localhost:8888/proxy/api/bootstrap-static/').then(response => response.json()).then(data => {
  const fpl = data;
  const teamDiv = document.querySelector('.teamsList');
  const teams = [];
  const numTeams = fpl.teams.length;
  const team1 = '<div class=\'ac\'><h2 class=\'ac-q\' tabindex=\'0\'>';
  const team2 = '</h2><div class=\'ac-a\'><p>Some content<br>more content<br>even more</p></div></div>';

  console.log(fpl);

  for (i = 0; i < numTeams; i++) {
    teams.push(fpl.teams[i].name);
  }

  teams.forEach(teamName => {
    teamDiv.innerHTML += team1 + `${teamName}` + team2;
  });

  new Accordion('.teamsList');

  const teamsDown = document.querySelector('.teams-dropdown');
  teamsDown.addEventListener('click', makeActive => {
    if (teamsDown.classList.length < 3) {
      teamsDown.classList.add('is-active');
    } else {
      teamsDown.classList.remove('is-active');
    }
  });
}).catch(error => console.error(error));