import subprocess
import time

print("Starting surge deploy script...")
# Pass email and password via stdin to surge login
login_process = subprocess.Popen(
    ["npx.cmd", "-y", "surge", "login"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

out, err = login_process.communicate(input="ahmed.saad.portfolio.2026@gmail.com\nAhmedSaad2026!\n")
print("Login output:", out)
print("Login err:", err)

# Now deploy dist to domain ahmed-saad-2026.surge.sh
deploy_process = subprocess.Popen(
    ["npx.cmd", "-y", "surge", "./dist", "--domain", "ahmed-saad-2026.surge.sh"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

out_d, err_d = deploy_process.communicate(input="\n\n")
print("Deploy output:", out_d)
print("Deploy err:", err_d)
