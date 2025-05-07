fetch('http://localhost:3000/api/time')
  .then(res => res.json())
  .then(data => {
    const report = document.getElementById('report');
    let total = 0;
    data.forEach(entry => {
      const div = document.createElement('div');
      div.textContent = `Website: ${entry.url}, Time: ${Math.round(entry.duration / 1000)}s`;
      total += entry.duration;
      report.appendChild(div);
    });
    const summary = document.createElement('h3');
    summary.textContent = `Total time online: ${Math.round(total / 1000)}s`;
    report.appendChild(summary);
  });