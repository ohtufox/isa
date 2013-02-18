(function(intelligentSecurityAdvisor, showPwd, undefined) {
    
    intelligentSecurityAdvisor.init = function() {
        showPwd.fixPage(3000);
        addDOMListener();
    };

    function addDOMListener() {
        var MutationObserver = window.MutationObserver;
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                showPwd.fixPage(3000);
            });
        });
        observer.observe(document.body, {childList:true, subtree:true});
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, showPwd));

