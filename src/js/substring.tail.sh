# IMHO shorter and more readable, speed seems to be the same
grasp \
	-e '$str.substring($str.length - $x,$str.length)'\
 	-R '{{str}}.slice(-{{x}})' \
 	"$@"