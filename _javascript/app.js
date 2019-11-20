fetch('http://localhost:8888/proxy/api/bootstrap-static/')
    .then((response) => response.json())
    .then((data) => {
      // Data
      const fpl = data;
      console.log(fpl);
      const teamTotal = fpl.teams.length;
      const allTeams = [];
      let activeTeams = [];
      let inactiveTeams = [];
      for (i = 0; i < teamTotal; i++) {
        allTeams.push(fpl.teams[i].name);
      }
      // Targets
      const teamsAcList = document.querySelector('.teams-ac-list');
      const teamsDropList = document.querySelector('.teams-dropdown-list');
      const teamsDown = document.querySelector('.teams-dropdown');
      // Content
      const acWrap1 = '<div class=\'ac ac-item\'><h2 class=\'ac-q\' tabindex=\'0\'>';
      const acWrap2 = '</h2><div class=\'ac-a\'><p>Some content<br>more content<br>even more</p></div></div>';
      const dropWrap1 = '<a href="#" class="dropdown-item">';
      const dropWrap2 = '</a><hr class="dropdown-divider">';
      // Functions
      populate = () => {
        for (i = 0; i < teamTotal; i++) {
          // Push team names into inactiveTeams array
          inactiveTeams.push(fpl.teams[i].name);
        }
        allTeams.forEach((team) => {
          // Add team names within accordion
          teamsAcList.innerHTML += acWrap1 + `${team}` + acWrap2;
        });
        allTeams.forEach((team) => {
          // Add team names within dropdown list
          teamsDropList.innerHTML += dropWrap1 + `${team}` + dropWrap2;
        });
      };
      populate();

      rePopulate = () => {
        activeTeams.length = 0;
        inactiveTeams.length = 0;
        for (i = 0; i < teamTotal; i++) {
          // Push team names into an array
          inactiveTeams.push(fpl.teams[i].name);
        }
      };

      new Accordion('.teams-ac-list');

      teamsDown.addEventListener('click', (active) => {
        // Add or remove active class on main dropdown
        if (teamsDown.classList.length < 3) {
          teamsDown.classList.add('is-active');
        } else {
          teamsDown.classList.remove('is-active');
        }
        active.stopPropagation();
      });

      const teamsDropLinks = teamsDropList.querySelectorAll('a');
      const downReset = document.querySelector('.reset');
      const acItems = document.querySelectorAll('.teams-ac-list .ac-item');

      for (i = 0; i < teamsDropLinks.length; i++) {
        teamsDropLinks[i].addEventListener('click', (active) => {
          const t = active.target;
          // Add active class on dropdown item
          if (t.classList.length <= 1) {
            t.classList.add('is-active');
            // Update arrays
            activeTeams.push(t.innerHTML);
            inactiveTeams = inactiveTeams.filter((el) => el !== t.innerHTML);
            // Show reset button
            downReset.style.display = 'block';
            acItems.forEach((item) => {
              for (i = 0; i < activeTeams.length; i++) {
                if (activeTeams[i] === item.firstChild.innerHTML) {
                  item.style.display = 'block';
                } else {
                  for (x = 0; x < inactiveTeams.length; x++) {
                    if (inactiveTeams[x] === item.firstChild.innerHTML) {
                      item.style.display = 'none';
                    }
                  }
                }
              }
            });
          } else { // if classlist > 1
            // Remove active class on dropdown item
            t.classList.remove('is-active');
            // Update arrays
            inactiveTeams.push(t.innerHTML);
            activeTeams = activeTeams.filter((el) => el !== t.innerHTML);
            // Hide reset button
            if (t.classList !== 'is-active' && activeTeams.length === 0) {
              downReset.style.display = 'none';
            };
          };
          active.stopPropagation();
        });
      };
      downReset.addEventListener('click', (active) => {
        for (i = 0; i < teamsDropLinks.length; i++) {
          teamsDropLinks[i].classList.remove('is-active');
          for (x = 0; x < acItems.length; x++) {
            if (teamsDropLinks[i].innerHTML == acItems[x].firstChild.innerHTML) {
              acItems[x].style.display = 'block';
            };
          };
        }
        rePopulate();
        downReset.style.display = 'none';
        active.stopPropagation();
      });
    })
    .catch((error) => console.error(error));
