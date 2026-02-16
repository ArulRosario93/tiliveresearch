import './ReportContents.css';
import CurrentPageLocation from "../../../Components/CurrentPageLocation/CurrentPageLocation";
import ReportContentsHeader from "./ReportContentsHeader/ReportContentsHeader";
import { data } from '../../../Storage/Reports.js';

import picture1 from '../../../assets/Picture1.png';
import picture2 from '../../../assets/Picture2.png';
import picture3 from '../../../assets/Picture3.png';
import picture4 from '../../../assets/Picture4.png';
import picture5 from '../../../assets/Picture5.png';
import picture6 from '../../../assets/Picture6.png';
import picture8 from '../../../assets/Picture8.png';
import picture9 from '../../../assets/Picture9.png';

const imageLibrary = {
    'picture1': picture1,
    'picture2': picture2,
    'picture3': picture3,
    'picture4': picture4,
    'picture5': picture5,
    'picture6': picture6,
    'picture8': picture8,
    'picture9': picture9,
};

const ReportContents = ({ content, currentReportLabel, changelabels }) => {


    const lines = content[currentReportLabel].split('\n');

    const formatBold = (text) => {
        const parts = text.split(/'([^']+)'/g);
        return parts.map((part, i) => (
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        ));
    };

    const BULLETS = ["•", "◦", "▪", "▫", "–", "→"];
    const TAB_SIZE = 24;

    return(
        <div className="ReportContents">

            <CurrentPageLocation />

            <h2 className="ReportContentsHead">{data[0].title}</h2>
            <p className="ReportContentsText">{data[0].description}</p>

            <ReportContentsHeader handleClick={changelabels} currentReportLabel={currentReportLabel} />
            <p className="ReportContentsLongText" >

                { 
                 currentReportLabel === 'description' ? 
                  lines.map((line, index) => {
                      const trimmedLine = line.trim();

                      // 2. Handle Empty Lines (\n\n)
                      if (trimmedLine === "") {
                          return <div key={index} style={{ height: '1.2em' }} />;
                      }

                      // 3. Handle Images (Improved Detection)
                      // This looks for the pattern anywhere in the line
                      if (trimmedLine.includes('[IMAGE:')) {
                      const match = trimmedLine.match(/\[IMAGE:\s*(.*?)\s*\]/);
                      if (match) {
                          const imageKey = match[1];
                          // Check if it's a mapped local asset or a direct URL
                          const src = imageLibrary[imageKey] || imageKey;

                          return (
                          <div key={index} style={{ textAlign: 'center', margin: '5px 0' }}>
                              <img 
                                className='ReportContentsImage'
                                src={src} 
                                alt="Content" 
                                onError={(e) => console.error("Image failed to load:", src)}
                              />
                          </div>
                          );
                      }}

                      // 4. Handle Bullets
                      if (trimmedLine.startsWith('•')) {
                      const content = trimmedLine.replace('•', '').trim();
                      const hasLabel = content.match(/^([^:]+):/);
                      
                      if (hasLabel) {
                          return (
                          <li key={index} style={{ marginLeft: '25px', marginBottom: '8px' }}>
                              <strong>{hasLabel[1]}:</strong> {formatBold(content.replace(/^[^:]+:/, ""))}
                          </li>
                          );
                      }
                      return <li key={index} style={{ marginLeft: '25px', marginBottom: '8px' }}>{formatBold(content)}</li>;
                      }

                      // 5. Default Text
                      return <p key={index} style={{ margin: 0, paddingBottom: '4px' }}>{formatBold(trimmedLine)}</p>;
                  })
                : currentReportLabel === 'tableofcontent' ?
                lines.map((line, index) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine === "") return <div key={index} style={{ height: '1em' }} />;

                    // Regex to catch the number part and the text part
                    const tocMatch = trimmedLine.match(/^(\d+(\.\d+)*\.?)\s+(.*)/);

                    if (tocMatch) {
                      const numberPart = tocMatch[1];
                      const textPart = tocMatch[3];

                      // Calculate indentation based on hierarchy (dots)
                      const dotCount = (numberPart.match(/\./g) || []).length;
                      const indent = dotCount * 20; 

                      return (
                        <div
                          key={index} 
                          style={{ 
                            display: 'flex',          // This creates the two-column alignment
                            paddingLeft: `${indent}px`, 
                            marginBottom: '4px' 
                          }}
                        >
                          {/* This box holds the number. minWidth keeps the words aligned! */}
                          <span style={{ 
                            minWidth: '60px',         // Adjust this width if your numbers are very long
                            display: 'inline-block',
                            color: '#666',            // Optional: subtle color for numbers
                            flexShrink: 0             // Prevents the number from squishing
                          }}>
                            {numberPart}
                          </span>

                          {/* This box holds the actual text */}
                          <span style={{ textAlign: 'left' }}>
                            {textPart}
                          </span>
                        </div>
                      );
                    }

                    // ... rest of your logic for [IMAGE:] and • Bullets ...
                    return <p key={index} style={{ margin: 0 }}>{trimmedLine}</p>;
                  }) : content[currentReportLabel].trim().split("\n").map((line, index) => {
                    const bulletCount = (line.match(/•/g) || []).length;

                    const level = (line.match(/•/g) || []).length;

                    // Pick bullet style (cycle if level > styles)
                    const bullet = BULLETS[(level - 1) % BULLETS.length];

                    // Remove all original bullets
                    const cleanText = line.replace(/•+/g, "").trim();

                    return (
                      <div
                        key={index}
                        style={{
                          paddingLeft: `${level * TAB_SIZE}px`,
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <span style={{ marginRight: 8 }}>{bullet}</span>
                        <span>{cleanText}</span>
                      </div>
                    );
                  })
                }
            </p>

        </div>
    );
}

export default ReportContents;