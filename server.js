const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start HTTP server
const server = app.listen(PORT, () => {
    console.log(`✅ APULA Server running: http://localhost:${PORT}`);
    console.log(`🌐 For Codespace: https://${process.env.CODESPACE_NAME}-${PORT}.preview.app.github.dev`);
});

// WebSocket Server
const wss = new WebSocket.Server({ server, path: '/arduino-ws' });
let clients = [];

// Simulated Arduino data (for testing without hardware)
let simulatedSensors = [800, 800, 800];
let fireDetected = false;

// Broadcast to all connected clients
function broadcast(data) {
    const message = JSON.stringify(data);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Generate simulated sensor data
function generateSensorData() {
    // 10% chance of fire for testing
    if (Math.random() < 0.1 && !fireDetected) {
        fireDetected = true;
        const fireSensor = Math.floor(Math.random() * 3);
        simulatedSensors = [800, 800, 800];
        simulatedSensors[fireSensor] = 150; // Low value = fire
        
        broadcast({
            type: 'fire_alert',
            fireDetected: true,
            location: `Sensor ${fireSensor + 1} (A${fireSensor})`,
            sensorValues: [...simulatedSensors],
            message: `🔥 FIRE DETECTED at Sensor ${fireSensor + 1}`,
            timestamp: new Date().toISOString()
        });
        
        // Reset after 10 seconds
        setTimeout(() => {
            fireDetected = false;
            simulatedSensors = [800, 800, 800];
        }, 10000);
    } else if (!fireDetected) {
        // Normal random fluctuations
        simulatedSensors = simulatedSensors.map(val => 
            Math.max(300, Math.min(900, val + (Math.random() * 100 - 50)))
        );
        
        broadcast({
            type: 'sensor_data',
            fireDetected: false,
            sensorValues: [...simulatedSensors],
            message: 'Normal operation',
            timestamp: new Date().toISOString()
        });
    }
}

// Start sensor simulation
setInterval(generateSensorData, 2000);

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('🔌 New WebSocket client connected');
    clients.push(ws);
    
    // Send initial connection message
    ws.send(JSON.stringify({
        type: 'connection',
        status: 'connected',
        message: 'Connected to APULA Arduino Server',
        timestamp: new Date().toISOString()
    }));
    
    // Send initial sensor data
    ws.send(JSON.stringify({
        type: 'sensor_data',
        sensorValues: simulatedSensors,
        fireDetected: false,
        timestamp: new Date().toISOString()
    }));
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('📨 Received:', data);
            
            // Handle commands from website
            if (data.command === 'test_connection') {
                ws.send(JSON.stringify({
                    type: 'command_response',
                    command: 'test',
                    message: 'Server is working!',
                    timestamp: new Date().toISOString()
                }));
            }
            
            if (data.command === 'simulate_fire') {
                // Manually trigger fire simulation
                fireDetected = true;
                simulatedSensors = [150, 600, 450];
                broadcast({
                    type: 'fire_alert',
                    fireDetected: true,
                    location: 'Manual Test: Sensor 1',
                    sensorValues: [...simulatedSensors],
                    message: '🔥 MANUAL TEST: Fire detected!',
                    timestamp: new Date().toISOString()
                });
            }
            
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('🔌 WebSocket client disconnected');
        clients = clients.filter(client => client !== ws);
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('🚀 WebSocket server ready on /arduino-ws');
console.log('📡 Simulating 3 flame sensors (A0, A1, A2)');
