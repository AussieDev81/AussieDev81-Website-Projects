// Main navigation bar
const navContent = (page) => {
	return `
	    <div class="navbar navbar-default navbar-static-top" role="navigation">
			<div class="navbar-header">
				<button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon icon-bar"></span>
					<span class="icon icon-bar"></span>
					<span class="icon icon-bar"></span>
				</button>
				<a href="/" class="navbar-brand"><span>AussieDev81</span></a>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="/" 	 ${page.toUpperCase() === "HOME" ? 'class="active"' : ""} 	   >HOME</a></li>
					<li><a href="about" 	 ${page.toUpperCase() === "ABOUT" ? 'class="active"' : ""}	   >ABOUT</a></li>
					<li><a href="portfolio" ${page.toUpperCase() === "PORTFOLIO" ? 'class="active"' : ""} >PORTFOLIO</a></li>
					<li><a href="contact" 	 ${page.toUpperCase() === "CONTACT" ? 'class="active"' : ""}   >CONTACT</a></li>
				</ul>
			</div>
		</div>
	`;
};


/**
 * Fetches the README document from GitHub repository and shows the current stats for both AussieDev81 and nathansnow1981 accounts
 */
const fetchReadme = () => fetch("https://api.github.com/repos/AussieDev81/AussieDev81-Website/readme", {
	accept: "application/vnd.github.html+json",
})
	.then((response) => response.json())
	.then((data) => (document.getElementById("github-block").innerHTML = atob(data.content)))
	.catch((error) => console.error(error));


/**
 * Fetches all GitHub repos from both the AussieDev81 and nathansnow1981 accounts, merges and sorts the repos based on the
 * date they were last updated, then filters only the 5 most recently updated repos.
 * The most recently updated repos are then added to the 'recent-repos' table in index.html
 */
const fetchTopFiveRepos = async () => {
	//Define both GitHub repository api calls
	let ad81Data = await fetch("https://api.github.com/users/AussieDev81/repos");
	let ns1981Data = await fetch("https://api.github.com/users/nathansnow1981/repos");

	//Call both APIs asynchronously
	Promise.all([ad81Data, ns1981Data])
		.then((repos) => Promise.all(repos.map((repo) => repo.json())))
		.then((repos) => {
			//Combine all repos into one array
			let allRepos = repos[0].concat(repos[1]);
			//Sort repos by date last updated and keep only the most recent 5
			allRepos = allRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 5);

			//Define table rows using the 5 recent repositories
			let tableRows = "";
			allRepos.forEach((repo) => {
				tableRows += `
		<tr>
			<td>${new Date(repo.pushed_at).toLocaleDateString("en-AU")}</td>
			<td>${repo.name}</td>
			<td><a href='${repo.html_url}' target='_blank' title='Visit ${repo.name}'>${repo.html_url}</a></td>
		</tr>
		`;
			});

			//Create table and insert the predefined table rows
			const recentRepos =
				`
			<h2>5 Most Recent Repos</h2>
			<div id="table-box">
				<table>
				<thead>
					<tr>
						<th>Last Updated</th>
						<th>Repository Name</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
				` +
					tableRows +
					`
				</tbody>
				</table>
			</div>
		`;

			document.getElementById("recent-repos").innerHTML = recentRepos;
		});
};


//Copyright notice
const copyrightContent = () => {
	return `
	    <div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-6">
					<p>Copyright &copy; 
						${new Date().getFullYear()} - AussieDev81 - All Rights Reserved
					</p>
				</div>
				<div class="col-md-6 col-sm-6">
					<ul class="social-icons">
						<li><a href="https://github.com/AussieDev81" class="fa-brands fa-github" aria-label="GitHub social link" target="_blank"></a></li>
						<li><a href="https://twitter.com/AussieDev81" class="fa-brands fa-twitter" aria-label="Twitter social link" target="_blank"></a></li>
						<li><a href="https://www.youtube.com/channel/UCfzYf3DeS6W2hpgXqniOjqQ"
								class="fa-brands fa-youtube" aria-label="YouTube social link" target="_blank"></a></li>
						<li><a href="https://discord.gg/vXus9NrC3P" class="fa-brands fa-discord" aria-label="Discord social link" target="_blank"></a></li>
						<li><a href="mailto:info@aussiedev81.com&subject=Enquiry" class="fa fa-envelope" aria-label="Email link" target="_blank"></a></li>
					</ul>
				</div>
			</div>
		</div>
	`;
};

//Site footer
const footerContent = () => {
	return `
	    <div class="container">
			<div class="row">

				<div class="col-md-4 col-sm-6">
					<h3>AussieDev81</h3>
					<p><i class="fa fa-envelope-o"></i> info@aussiedev81.com</p>
					<p><i class="fa fa-globe"></i> www.aussiedev81.com</p>
				</div>

				<div class="col-md-4 col-sm-6">
					<h3>Menu</h3>
					<p><a href="/">Home</a></p>
					<p><a href="about">About</a></p>
					<p><a href="portfolio">Portfolio</a></p>
					<p><a href="contact">Contact</a></p>
				</div>

				<div class="col-md-4 col-sm-6">
					<h3>Useful Links</h3>
					<p><a href="https://start.spring.io/">Spring Initializer</a></p>
					<p><a href="https://adoptopenjdk.net/">AdoptOpenJDK</a></p>
					<p><a href="https://www.thymeleaf.org/">Thymeleaf</a></p>
				</div>

			</div>
		</div>
	`;
};


/**
 * Runs when the user is scrolling the page and shows the "scroll to top" button if page is scrolled past a predefined limit
 */
window.onscroll = () => {
	const scrollLimit = 150;
	let scrollBtn = document.getElementById("scroll-btn");
	let chromiumTop = document.documentElement.scrollTop;
	let safariTop = document.body.scrollTop;
	scrollBtn.style.display = (chromiumTop > scrollLimit || safariTop > scrollLimit) ? "block" : "none";
};


/**
 * Returns to the top of the current page, using a smooth animation
 */
const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });
