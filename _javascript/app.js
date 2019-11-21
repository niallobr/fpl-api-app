fetch('http://localhost:8888/proxy/api/bootstrap-static/')
    .then((response) => response.json())
    .then((data) => {
      // Data
      const fpl = data;
      console.log(fpl);
      const allTeams = [];
      let activeTeams = [];
      let inactiveTeams = [];
      const teamTotal = fpl.teams.length;
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
      const dropWrap2 = '<span class="icon close is-small"><i class="fas fa-times-circle" aria-hidden="true"></i></span></a><hr class="dropdown-divider">';
      const closeIcon = '<span class="icon close is-small"><i class="fas fa-times-circle" aria-hidden="true"></i></span>';
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

      filterTeams = () => {
        acItems.forEach((item) => {
          for (i = 0; i < activeTeams.length; i++) {
            if (activeTeams[i] === item.firstChild.textContent) {
              item.style.display = 'block';
            } else {
              for (x = 0; x < inactiveTeams.length; x++) {
                if (inactiveTeams[x] === item.firstChild.textContent) {
                  item.style.display = 'none';
                }
              }
            }
          }
        });
      };

      new Accordion('.teams-ac-list');

      teamsDown.addEventListener('click', (active) => {
        if (teamsDown.classList.length < 3) {
          // Add active class on dropdown
          teamsDown.classList.add('is-active');
        } else {
          // Remove active class on dropdown
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
          if (t.classList.length <= 1) {
            // Add active class on dropdown item
            t.classList.add('is-active');
            // Add close icon on dropdown item
            t.querySelector('.close').style.display = 'inline';
            // Update arrays
            activeTeams.push(t.textContent);
            console.log(activeTeams);
            inactiveTeams = inactiveTeams.filter((el) => el !== t.textContent);
            console.log(inactiveTeams);
            // Show reset button
            downReset.style.display = 'block';
            // Filter
            filterTeams();
          } else { // if classlist > 1
            // Remove active class on dropdown item
            t.classList.remove('is-active');
            // Remove close icon on dropdown item
            t.querySelector('.close').style.display = 'none';
            // Update arrays
            inactiveTeams.push(t.textContent);
            console.log(inactiveTeams);
            activeTeams = activeTeams.filter((el) => el !== t.textContent);
            console.log(activeTeams);
            // Filter
            filterTeams();
            if (t.classList !== 'is-active' && activeTeams.length === 0) {
              for (x = 0; x < acItems.length; x++) {
                // Unhide accordion content
                acItems[x].style.display = 'block';
              }
              // Hide reset button
              downReset.style.display = 'none';
            };
          };
          active.stopPropagation();
        });
      };
      downReset.addEventListener('click', (active) => {
        for (i = 0; i < teamsDropLinks.length; i++) {
          // Remove active class on dropdown item
          teamsDropLinks[i].classList.remove('is-active');
          for (x = 0; x < acItems.length; x++) {
            if (teamsDropLinks[i].textContent == acItems[x].firstChild.textContent) {
              // Unhide accordion content
              acItems[x].style.display = 'block';
            };
          };
        }
        // Hide close icon on dropdown item
        t.querySelector('.close').style.display = 'none';
        // Hide reset button
        downReset.style.display = 'none';
        // Repopulate content
        rePopulate();
        active.stopPropagation();
      });
    })
    .catch((error) => console.error(error));
