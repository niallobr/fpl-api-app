fetch('http://localhost:8888/proxy/api/bootstrap-static/')
    .then((response) => response.json())
    .then((data) => {
      const fpl = data;
      const teamsAc = document.querySelector('.teams-list');
      const teams = [];
      const numTeams = fpl.teams.length;
      const acWrap1 = '<div class=\'ac ac-item\'><h2 class=\'ac-q\' tabindex=\'0\'>';
      const acWrap2 = '</h2><div class=\'ac-a\'><p>Some content<br>more content<br>even more</p></div></div>';

      console.log(fpl);

      for (i = 0; i < numTeams; i++) {
        teams.push(fpl.teams[i].name);
      }

      teams.forEach((teamName) => {
        teamsAc.innerHTML += acWrap1 + `${teamName}` + acWrap2;
      });

      const dropWrap1 = '<a href="#" class="dropdown-item">';
      const dropWrap2 = '</a><hr class="dropdown-divider">';
      const teamsContent = document.querySelector('.teams-content');

      teams.forEach((teamName) => {
        teamsContent.innerHTML += dropWrap1 + `${teamName}` + dropWrap2;
      });

      new Accordion('.teams-list');

      const teamsDown = document.querySelector('.teams-dropdown');
      teamsDown.addEventListener('click', (makeActive) => {
        if (teamsDown.classList.length < 3) {
          teamsDown.classList.add('is-active');
        } else {
          teamsDown.classList.remove('is-active');
        }
      });

      const teamsContentLinks = teamsContent.querySelectorAll('a');
      for (i = 0; i < teamsContentLinks.length; i++) {
        console.log(teamsContentLinks[i].innerHTML);
        teamsContentLinks[i].addEventListener('click', (doSomething) => {
          doSomething.target.style.backgroundColor = 'rgb(195, 195, 195)';
        });
      };
    })
    .catch((error) => console.error(error));
