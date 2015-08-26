# getGit
A jQuery plugin to retrieve repos from GitHub for use on your portfolio site.

# Usage | Example
```
$.getGit.repos('user', 'josh-burgess', function (repos) {
  var html = [];

  $.each(repos.reverse(), function (i, repo) {
    html.push('<li><a target="_blank" href="$0"><span>$1</span><p>$2</p></a></li>'
      .replace(/\$0/, repo.html_url)
      .replace(/\$1/, repo.name)
      .replace(/\$2/, repo.description));
  });

  $('#codelist').html(html.join(''))
});
```
