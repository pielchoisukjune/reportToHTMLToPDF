@echo off
echo ==================================================
echo =           rename and move file                 =
echo ==================================================


set deskTopPah=C:\Users\Administrator\Desktop\
set destFolderPah=%2
set oldPath=%1
set oldFileNm=%3
set newFileNm=%oldFileNm:.html=%
set renamePath=%deskTopPah%%oldFileNm:.html=%

cd /D C:\Users\Administrator\Desktop\
ren %oldFileNm% %newFileNm%

move %renamePath% %destFolderPah%