const MinecraftServer = require('minecraft-server-util');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 定义服务器地址和端口
const serverAddress = 'be.craft.fun';  // 替换为你的服务器地址
const serverPort = 32123;             // 替换为你的服务器端口

// 定义JSON文件路径
const statusFilePath = path.join(__dirname, 'server_status.json');

// 定义获取服务器状态的函数
async function getServerStatus() {
    try {
        // 创建服务器实例
        const server = new MinecraftServer(serverAddress, serverPort);
        
        // 获取服务器状态
        const status = await server.status();
        
        // 创建一个包含状态信息的字典
        const statusInfo = {
            status: status.online ? 'online' : 'offline',
            online_players: status.players.online,
            max_players: status.players.max,
            version: status.version,
            tps: status.tps || 0.0  // 假设服务器返回TPS信息
        };
        
        // 将状态信息保存到JSON文件
        fs.writeFileSync(statusFilePath, JSON.stringify(statusInfo, null, 2));
        
        console.log('服务器状态已更新:', statusInfo);
        
    } catch (error) {
        console.error('获取服务器状态失败:', error);
    }
}

// 定期检查服务器状态
const checkInterval = 10000;  // 每10秒检查一次
setInterval(getServerStatus, checkInterval);
getServerStatus();  // 初始加载时获取一次数据
