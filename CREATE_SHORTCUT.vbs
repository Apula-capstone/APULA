Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.SpecialFolders("Desktop") & "\APULA Dashboard.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = oWS.CurrentDirectory & "\START_APULA.bat"
oLink.WorkingDirectory = oWS.CurrentDirectory
oLink.Description = "Launch APULA Fire Prevention System"
oLink.IconLocation = oWS.CurrentDirectory & "\public\favicon.ico"
oLink.Save