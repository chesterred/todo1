import React, { useEffect, useState } from 'react';

// const API_BASE = "http://localhost:3001";
const WHOIS_API_BASE = "https://whois.freeaiapi.xyz";

function WhoisLookup() {
  const [whoisData, setWhoisData] = useState(null);
  const [domainNameInput, setDomainNameInput] = useState("");
  const [domainSuffix, setDomainSuffix] = useState("com"); // Default suffix

  const performWhoisLookup = async (domainName, domainSuffix) => {
    try {
      const response = await fetch(`${WHOIS_API_BASE}/?name=${domainName}&suffix=${domainSuffix}`);
      const data = await response.json();
      setWhoisData(data);
    } catch (error) {
      console.error("Whois Error:", error);
    }
  }

  const handleDomainLookup = () => {
    performWhoisLookup(domainNameInput, domainSuffix);
  }

  return (
    <div className="whois-lookup-container">
      <h2>Whois Lookup</h2>
      <div className="whois-lookup">
        <input
          type="text"
          placeholder="Enter domain name"
          value={domainNameInput}
          onChange={(e) => setDomainNameInput(e.target.value)}
        />
        <select
          value={domainSuffix}
          onChange={(e) => setDomainSuffix(e.target.value)}
        >
          <option value="com">.com</option>
          <option value="net">.net</option>
          {/* Add other supported suffix options as needed */}
        </select>
        <button onClick={handleDomainLookup}>Perform Whois Lookup</button>
      </div>

      {whoisData && (
        <div className="whois-result">
          <h3>Whois Data</h3>
          <pre>{JSON.stringify(whoisData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default WhoisLookup;
