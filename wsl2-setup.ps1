# Script PowerShell para configurar WSL2 automaticamente

# Executar PowerShell como Administrador para rodar este script

Write-Host "Habilitando o recurso WSL..."
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

Write-Host "Habilitando o recurso Plataforma de Máquina Virtual..."
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

Write-Host "Reinicie o computador para aplicar as mudanças."
Write-Host "Após reiniciar, execute este script novamente para continuar a instalação."

# Após reiniciar, o usuário deve executar o script novamente para continuar

# Verifica se o WSL está instalado e qual a versão padrão
$wslVersionInfo = wsl --list --verbose 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "WSL não está instalado ou não há distribuições instaladas."
    Write-Host "Definindo WSL 2 como padrão..."
    wsl --set-default-version 2

    Write-Host "Baixando e instalando o pacote de atualização do kernel do Linux para WSL2..."
    $kernelInstallerUrl = "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi"
    $installerPath = "$env:TEMP\wsl_update_x64.msi"
    Invoke-WebRequest -Uri $kernelInstallerUrl -OutFile $installerPath
    Start-Process msiexec.exe -Wait -ArgumentList "/i `"$installerPath`" /quiet /norestart"
    Remove-Item $installerPath

    Write-Host "Instale uma distribuição Linux da Microsoft Store, por exemplo, Ubuntu."
    Write-Host "Após a instalação, abra a distribuição para configurar o usuário e senha."
} else {
    Write-Host "WSL já está instalado e configurado. Versões das distribuições:"
    Write-Host $wslVersionInfo
}
