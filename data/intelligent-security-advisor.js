(function(intelligentSecurityAdvisor, showPwd, undefined) {
    
    const DOM_LISTENER_TARGET = document.body;
    const DOM_LISTENER_OPTIONS = {
                                  childList:true,
                                  subtree:true
                                 };

    intelligentSecurityAdvisor.init = function() {
	if(document.URL != 'about:newtab') {
       		showPwd.fixPage(3000);
        	addDOMListener();
	}
    };

    function addDOMListener() {
        let MutationObserver = window.MutationObserver;
        let observer = new MutationObserver(function(mutations) {
                checkMutations(mutations);
        });
        observer.observe(DOM_LISTENER_TARGET, DOM_LISTENER_OPTIONS);
    }

    function checkMutations(mutations) {
        mutations.forEach(function(mutation) {
            let nodeList = mutation.addedNodes;
            checkNodeList(nodeList);
        });
    }

    function checkNodeList(nodeList) {
        for(let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].type === 'password'){
                showPwd.fixElement(nodeList[i], 3000);
            }
        }
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, showPwd));
