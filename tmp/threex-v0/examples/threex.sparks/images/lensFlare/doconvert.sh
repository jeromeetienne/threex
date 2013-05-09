# from http://www.opengl.org/resources/features/KilgardTechniques/LensFlare/

echo "convert Flares"
convert Flare1.bw Flare1.png
convert Flare2.bw Flare2.png
convert Flare3.bw Flare3.png
convert Flare4.bw Flare4.png
convert Flare5.bw Flare5.png
convert Flare6.bw Flare6.png
convert Flare7.bw Flare7.png
convert Flare8.bw Flare8.png
convert Flare9.bw Flare9.png

echo "convert Shine*.png"
convert Shine1.bw Shine1.png
convert Shine2.bw Shine2.png
convert Shine3.bw Shine3.png
convert Shine4.bw Shine4.png
convert Shine5.bw Shine5.png
convert Shine6.bw Shine6.png
convert Shine7.bw Shine7.png
convert Shine8.bw Shine8.png
convert Shine9.bw Shine9.png


# change the transparent to black in all .png
echo "Change Transaprent to black in all .png"
ls *.png | xargs -n 1 -I fname convert -transparent black fname fname
