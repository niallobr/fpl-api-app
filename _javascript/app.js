fetch('http://localhost:8888/proxy/api/bootstrap-static/')
    .then((response) => response.json())
    .then((data) => {
      const fpl = data;
      const teamsAcList = document.querySelector('.teams-ac-list');
      const teams = [];
      const numTeams = fpl.teams.length;
      const acWrap1 = '<div class=\'ac ac-item\'><h2 class=\'ac-q\' tabindex=\'0\'>';
      const acWrap2 = '</h2><div class=\'ac-a\'><p>Some content<br>more content<br>even more</p></div></div>';
      console.log(fpl);

      for (i = 0; i < numTeams; i++) {
        teams.push(fpl.teams[i].name);
      }

      teams.forEach((teamName) => {
        teamsAcList.innerHTML += acWrap1 + `${teamName}` + acWrap2;
      });

      const acItem = document.querySelectorAll('.teams-ac-list .ac-item');

      const dropWrap1 = '<a href="#" class="dropdown-item">';
      const dropWrap2 = '</a><hr class="dropdown-divider">';
      const teamsDropList = document.querySelector('.teams-dropdown-list');

      teams.forEach((teamName) => {
        teamsDropList.innerHTML += dropWrap1 + `${teamName}` + dropWrap2;
      });

      new Accordion('.teams-ac-list');

      const teamsDown = document.querySelector('.teams-dropdown');
      teamsDown.addEventListener('click', (active) => {
        if (teamsDown.classList.length < 3) {
          teamsDown.classList.add('is-active');
        } else {
          teamsDown.classList.remove('is-active');
        }
        active.stopPropagation();
      });

      let activeTeams = [];
      const teamsDropLinks = teamsDropList.querySelectorAll('a');


      for (i = 0; i < teamsDropLinks.length; i++) {
        teamsDropLinks[i].addEventListener('click', (active) => {
          const t = active.target;
          if (t.classList.length <= 1) {
            t.classList.add('is-active');
            activeTeams.push(t.innerHTML);
            for (x = 0; x < acItem.length; x++) {
              if (t.classList.contains('is-active') && t.innerHTML == acItem[x].firstChild.innerHTML) {
                acItem[x].style.display = 'none';
              };
            };
            console.log(activeTeams);
          } else {
            t.classList.remove('is-active');
            activeTeams.forEach((name) => {
              if (t.innerHTML === name) {
                activeTeams = activeTeams.filter((i) => i !== t.innerHTML);
              }
            });
            console.log(activeTeams);
          };
          active.stopPropagation();
        });
      };
    })
    .catch((error) => console.error(error));
