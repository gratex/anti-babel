
# IMHO second param is useless  
grasp \
	-e '$str.substring($x,$str.length)'\
 	-R '{{str}}.substring({{x}})' \
 	"$@"