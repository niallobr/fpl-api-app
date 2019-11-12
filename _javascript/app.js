fetch('http://localhost:8888/proxy/api/bootstrap-static/')
    .then((response) => response.json())
    .then((data) => {
      const fpl = data;
      const teamDiv = document.querySelector('#teamList');
      const teams = [];
      const numTeams = fpl.teams.length;

      console.log(fpl);

      for (i = 0; i < numTeams; i++) {
        teams.push(fpl.teams[i].name);
      }

      teams.forEach((teamName) => teamDiv.innerHTML += `<li>${teamName}</li>`);
    })
    .catch((error) => console.error(error));
