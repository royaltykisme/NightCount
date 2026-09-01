# Network Deployment Guide

This guide explains how to make DayDream Browser accessible to other computers on your network or the internet.

## Local Network Access (Same Network)

### Prerequisites
- Server computer and client computer on the same network
- Port 8080 open (or your chosen port)

### Steps

1. **Build the application:**
   ```bash
   pnpm build
   ```

2. **Start the server with network binding:**
   ```bash
   pnpm start:web
   ```
   
   Or explicitly:
   ```bash
   HOST=0.0.0.0 PORT=8080 pnpm start
   ```

3. **Find your server's IP address:**
   
   **On Linux/Mac:**
   ```bash
   hostname -I
   # or
   ifconfig | grep inet
   ```
   
   **On Windows:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (typically starts with 192.168.x.x or 10.x.x.x)

4. **Access from another computer:**
   Open a web browser and navigate to:
   ```
   http://YOUR_SERVER_IP:8080
   ```
   
   Example: `http://192.168.1.50:8080`

## Internet Access (External Network)

To make DayDream accessible from the internet, you have several options:

### Option 1: Ngrok (Easiest for Testing)

1. **Install Ngrok:**
   ```bash
   # Download from https://ngrok.com/download
   ```

2. **Start the application:**
   ```bash
   pnpm start:web
   ```

3. **In another terminal, expose it:**
   ```bash
   ngrok http 8080
   ```

4. **Access the public URL provided by ngrok**

### Option 2: Cloud Deployment (Recommended for Production)

The project already has a `vercel.json` configuration. Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

### Option 3: Port Forwarding (Self-Hosted)

1. Log into your router's admin panel (usually 192.168.1.1 or 192.168.0.1)
2. Find Port Forwarding settings
3. Forward port 8080 (external) to your server's local IP and port 8080
4. Access via your public IP: `http://YOUR_PUBLIC_IP:8080`

⚠️ **Security Warning:** Port forwarding exposes your server to the internet. Consider:
- Using HTTPS (requires SSL certificate)
- Setting up authentication
- Using a firewall/security group
- Running behind a reverse proxy like Nginx

### Option 4: Docker + Cloud Run / Railway

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

CMD ["pnpm", "start"]
```

Then deploy to Google Cloud Run, Railway, or similar container platforms.

## Environment Variables

### Available Configuration

- **HOST**: Network interface to bind to (default: `0.0.0.0` for web deployment)
- **PORT**: Port number (default: `8080`)

### Example

```bash
HOST=0.0.0.0 PORT=3000 pnpm start
```

## Security Considerations

When exposing your application to the internet:

1. **Use HTTPS** - Set up SSL/TLS certificates
2. **Enable Authentication** - Add login requirements
3. **Rate Limiting** - Protect against abuse
4. **CORS Configuration** - Restrict allowed origins
5. **Content Security Policy** - Already configured in production mode
6. **Regular Updates** - Keep dependencies updated
7. **Monitor Access** - Log and monitor incoming connections
8. **Firewall Rules** - Use security groups/firewall rules on your cloud provider

## Troubleshooting

### Can't connect from another computer on the same network
- Check if port 8080 is open: `netstat -an | grep 8080`
- Verify firewall isn't blocking port 8080
- Confirm you're using the correct IP address
- Check server is running: `ps aux | grep "tsx index.ts"`

### Connection timeout
- Verify server IP address is correct
- Ensure server and client can reach each other (ping)
- Check router firewall settings
- Verify port forwarding if accessing externally

### Permission denied error
- Ports below 1024 require root/admin privileges
- Use a port above 1024 (8080 is recommended)
- Or run with elevated privileges (not recommended)

## Production Deployment Checklist

- [ ] Code built with `pnpm build`
- [ ] Environment variables set correctly
- [ ] Database/backend services running
- [ ] HTTPS/SSL configured
- [ ] Authentication enabled
- [ ] Rate limiting implemented
- [ ] Monitoring and logging enabled
- [ ] Backups configured
- [ ] Security headers configured (fastify/helmet handles this)
- [ ] Performance tested under load

## Additional Resources

- [Vite Server Options](https://vitejs.dev/config/server-options.html)
- [Fastify Deployment](https://www.fastify.io/docs/latest/Deployment/)
- [Vercel Deployment](https://vercel.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
