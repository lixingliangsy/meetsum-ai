const standups = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Generate a standup report
    const { team, startDate, endDate, format = 'json' } = req.query;
    
    let filtered = standups;
    if (team) {
      filtered = filtered.filter(s => s.team === team);
    }
    if (startDate) {
      filtered = filtered.filter(s => s.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(s => s.date <= endDate);
    }
    
    // Group by team and date
    const grouped = {};
    filtered.forEach(standup => {
      const key = `${standup.team}-${standup.date}`;
      if (!grouped[key]) {
        grouped[key] = {
          team: standup.team,
          date: standup.date,
          members: []
        };
      }
      grouped[key].members.push({
        member: standup.member,
        yesterday: standup.yesterday,
        today: standup.today,
        blockers: standup.blockers
      });
    });
    
    const report = {
      generatedAt: new Date().toISOString(),
      period: { startDate, endDate },
      totalStandups: filtered.length,
      teams: Object.values(grouped)
    };
    
    if (format === 'markdown') {
      // Generate Markdown report
      let markdown = `# Standup Report\n\n`;
      markdown += `**Generated:** ${new Date().toISOString().split('T')[0]}\n\n`;
      markdown += `**Total Standups:** ${filtered.length}\n\n`;
      
      Object.values(grouped).forEach(group => {
        markdown += `## Team: ${group.team} - ${group.date}\n\n`;
        group.members.forEach(member => {
          markdown += `### ${member.member}\n\n`;
          markdown += `**Yesterday:** ${member.yesterday}\n\n`;
          markdown += `**Today:** ${member.today}\n\n`;
          if (member.blockers) {
            markdown += `**Blockers:** ${member.blockers}\n\n`;
          }
        });
      });
      
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', 'attachment; filename="standup-report.md"');
      return res.status(200).send(markdown);
    } else if (format === 'pdf') {
      // For PDF, return a link to download (in a real app, would generate PDF)
      return res.status(200).json({
        success: true,
        message: 'PDF generation not yet implemented',
        downloadUrl: '/api/reports/standup.pdf'
      });
    } else {
      return res.status(200).json({
        success: true,
        report,
        count: filtered.length
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
