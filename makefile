
jslint:
	docker run --rm -it -v $(pwd):/lint hyzual/jscs /lint --verbose