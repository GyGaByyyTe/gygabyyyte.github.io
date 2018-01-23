test'
svgo -f icons/i -o icons/out --config='svgo.config'

svg-sprite-generate -d icons/out -o icons/sprite/mysprite.svg