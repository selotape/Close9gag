@echo off

SET /p version="Version Number:"

FIND "%version%" close9gag_crx\manifest.json >nul

IF %ERRORLEVEL% equ 1 (
	echo "Error: imput version number doesnt match the manifest."
) ELSE (
	"C:\Program Files\7-Zip\7z.exe" a -tzip "tags\%version%\close9gag_crx.zip" "close9gag_crx"
)

PAUSE