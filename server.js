const http = require('http'); 
const fs = require('fs');     
const os = require('os');
const entities = require('./entities'); 
const nameHelper = require('./nameHelper')

const server = http.createServer((req, res) => { 
  const { method, url } = req;

  if (method === 'GET' && url === '/') { 
    fs.readFile('file.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' }); 
        res.end('Error reading file');
      } 
      else {
        res.writeHead(200, { 'Content-Type': 'text/plain' }); 
        res.end(data); 
      }
    });
  } 
  
  else if (method === 'GET' && url === '/info') {
    const info = `Operating system: ${os.platform()}, ${os.release()}`; 
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(info);
  } 
  
  else if (method === 'GET' && url === '/entities') {
    const names = entities.map(entity => entity.name);
    res.writeHead(200, { 'Content-Type': 'application/json' }); 
    res.end(JSON.stringify(names)); 
  } 
  
  else if (method === 'GET' && url.startsWith('/entities/')) { 
    const id = url.split('/')[2]; 
    //const entity = entities.find(entity => entity.id === id);
    const entityName = nameHelper(id);

    if (entityName) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      // res.end(entity.name);
      res.end(entityName);
    } 
    
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' }); 
      res.end('Entity not found');
    }
  } 
  
  else {
    res.writeHead(302, { 'Location': '/' }); 
    res.end();
  }
});

const HOST = 'localhost';
const PORT = 3000;
server.listen(PORT, HOST, () => { 
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
