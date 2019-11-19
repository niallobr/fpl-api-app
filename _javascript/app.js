fetch('http://localhost:8888/proxy/api/bootstrap-static/')
    .then((response) => response.json())
    .then((data) => {
      const fpl = data;
      const teams = [];
      const numTeams = fpl.teams.length;
      console.log(fpl);

      for (i = 0; i < numTeams; i++) {
        // Push team names into an array
        teams.push(fpl.teams[i].name);
      }

      const teamsAcList = document.querySelector('.teams-ac-list');
      const acWrap1 = '<div class=\'ac ac-item\'><h2 class=\'ac-q\' tabindex=\'0\'>';
      const acWrap2 = '</h2><div class=\'ac-a\'><p>Some content<br>more content<br>even more</p></div></div>';

      teams.forEach((teamName) => {
        // Add team names within accordion
        teamsAcList.innerHTML += acWrap1 + `${teamName}` + acWrap2;
      });

      const teamsDropList = document.querySelector('.teams-dropdown-list');
      const dropWrap1 = '<a href="#" class="dropdown-item">';
      const dropWrap2 = '</a><hr class="dropdown-divider">';

      teams.forEach((teamName) => {
        // Add team names within dropdown list
        teamsDropList.innerHTML += dropWrap1 + `${teamName}` + dropWrap2;
      });

      new Accordion('.teams-ac-list');

      const teamsDown = document.querySelector('.teams-dropdown');
      teamsDown.addEventListener('click', (active) => {
        // Add or remove active class on main dropdown
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
          const acItem = document.querySelectorAll('.teams-ac-list .ac-item');
          // Add an active class to dropdown items and push to activeTeams
          if (t.classList.length <= 1) {
            t.classList.add('is-active');
            activeTeams.push(t.innerHTML);
            // Now filter selection from accordion list
            for (x = 0; x < acItem.length; x++) {
              if (t.classList.contains('is-active') && t.innerHTML == acItem[x].firstChild.innerHTML) {
                acItem[x].style.display = 'none';
              };
            };
          } else { // if classlist > 1
            // Remove active class on dropdown items if already active
            t.classList.remove('is-active');
            // If item not active and is in both lists then unhide it
            if (t.classList != 'is-active') {
              for (x = 0; x < acItem.length; x++) {
                if (t.innerHTML == acItem[x].firstChild.innerHTML) {
                  acItem[x].style.display = 'block';
                };
              };
            };
            // Remove inactive item from array
            activeTeams.forEach((name) => {
              if (t.innerHTML === name) {
                activeTeams = activeTeams.filter((i) => i !== t.innerHTML);
              };
            });
          };
          active.stopPropagation();
        });
      };
    })
    .catch((error) => console.error(error));
