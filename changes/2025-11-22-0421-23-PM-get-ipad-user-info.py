#!/usr/bin/env python3
"""
iPad User Information Extractor
Comprehensive tool to gather user data from iPad
"""

import subprocess
import json
import re
from pathlib import Path
from datetime import datetime

class IPadUserInfoExtractor:
    def __init__(self, ipad_ip="192.168.40.52", ssh_port=2222):
        self.ipad_ip = ipad_ip
        self.ssh_port = ssh_port
        self.ssh_user = "mobile"
        self.output_dir = Path("ipad-user-info")
        self.info = {}
        
    def run_ssh_command(self, command, timeout=10):
        """Execute command via SSH"""
        try:
            ssh_cmd = [
                'ssh',
                '-o', 'ConnectTimeout=5',
                '-o', 'StrictHostKeyChecking=no',
                '-p', str(self.ssh_port),
                f'{self.ssh_user}@{self.ipad_ip}',
                command
            ]
            result = subprocess.run(ssh_cmd, capture_output=True, text=True, timeout=timeout)
            return result.stdout.strip() if result.returncode == 0 else None
        except:
            return None
    
    def check_ssh_connection(self):
        """Check if SSH is available"""
        print("🔍 Checking SSH connection... - get-ipad-user-info.py:39")
        result = self.run_ssh_command("echo 'connected'")
        if result == "connected":
            print(f"✅ SSH connection active on port {self.ssh_port} - get-ipad-user-info.py:42")
            return True
        else:
            print(f"❌ SSH not available on port {self.ssh_port} - get-ipad-user-info.py:45")
            print("Make sure ashell is installed and 'sshserver start' is running - get-ipad-user-info.py:46")
            return False
    
    def get_device_info(self):
        """Get basic device information"""
... (truncated for brevity)