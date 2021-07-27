---
title: win10开机启动热点
date: 2021-07-26 08:53:15
tags: 

    
categories: 

    [windows]

---

# 1. 在任意位置新建文本文档，复制以下内容，保存后重命名为AutoHostpot.ps1

```BASH
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
Function Await($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}
Function AwaitAction($WinRtAction) {
    $asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and !$_.IsGenericMethod })[0]
    $netTask = $asTask.Invoke($null, @($WinRtAction))
    $netTask.Wait(-1) | Out-Null
}

$connectionProfile = [Windows.Networking.Connectivity.NetworkInformation,Windows.Networking.Connectivity,ContentType=WindowsRuntime]::GetInternetConnectionProfile()
$tetheringManager = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager,Windows.Networking.NetworkOperators,ContentType=WindowsRuntime]::CreateFromConnectionProfile($connectionProfile)
if ($tetheringManager.TetheringOperationalState -eq 1) 
{
    "Hotspot is already On!"
}
else{
    "Hotspot is off! Turning it on"
    Await ($tetheringManager.StartTetheringAsync()) ([Windows.Networking.NetworkOperators.NetworkOperatorTetheringOperationResult])
}

```

要测试代码是否有效，可修改文件名后执行测试一下

# 2. 使用powershell(管理员)，执行以下内容，在弹出选项中输入a

```BASH
set-executionpolicy remotesigned
```

# 3. 使用win+R，输入shell:startup，打开启动文件夹

新建快捷方式，选中第一步新建的AutoHostpot.ps1文件

