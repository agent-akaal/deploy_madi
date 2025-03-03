/**
 * Parses a markdown study plan into a structured format
 */
export function parseStudyPlan(markdown: string) {
  // Split the markdown by day headers
  const sections = markdown.split(/\*\*(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)([^*]+)\*\*/i);
  
  // The first section is the introduction
  const introduction = sections[0].trim();
  
  const days = [];
  
  // Process each day section
  for (let i = 1; i < sections.length; i += 3) {
    if (i + 2 < sections.length) {
      const dayName = sections[i];
      const dayTime = sections[i + 1]; // This captures the time allocation like "(3 hours)"
      const dayContent = sections[i + 2];
      
      // Parse resources for this day
      const resources = [];
      
      // Try to match the standard format first
      const standardRegex = /(\d+)\.\s+Resource:?\s+"?([^"\n]+)"?\s+\*\s+Time Allocation:?\s+([^\n]+)\n\s+\*\s+Reason:?\s+([^\n]+)\n\s+\*\s+URL:?\s+([^\n]+)/g;
      
      let match;
      while ((match = standardRegex.exec(dayContent)) !== null) {
        resources.push({
          number: match[1],
          title: match[2],
          timeAllocation: match[3],
          reason: match[4],
          url: match[5]
        });
      }
      
      // If no resources found with standard format, try alternative format
      if (resources.length === 0) {
        // This pattern looks for bullet points with hours and descriptions
        const altRegex = /\*\s+(\d+(?:\.\d+)?)\s+hours?:\s+([^\n]+)(?:\n|$)(?:Reason:\s+([^\n]+)(?:\n|$))?(?:URL:\s+([^\n]+)(?:\n|$))?/g;
        
        while ((match = altRegex.exec(dayContent)) !== null) {
          resources.push({
            number: resources.length + 1,
            title: match[2],
            timeAllocation: match[1] + " hours",
            reason: match[3] || "Not specified",
            url: match[4] || "#"
          });
        }
      }
      
      // If still no resources, try another format that's common in the output
      if (resources.length === 0) {
        const simpleRegex = /\*\s+(\d+(?:\.\d+)?)\s+hours?:\s+([^\n]+)(?:\n|$)/g;
        
        while ((match = simpleRegex.exec(dayContent)) !== null) {
          resources.push({
            number: resources.length + 1,
            title: match[2],
            timeAllocation: match[1] + " hours",
            reason: "Not specified",
            url: "#"
          });
        }
      }
      
      days.push({
        name: dayName,
        time: dayTime.trim(),
        content: dayContent,
        resources
      });
    }
  }
  
  return {
    introduction,
    days
  };
} 