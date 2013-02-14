(function(intelligentSecurityAdvisor, showPwd, undefined) {
    
    intelligentSecurityAdvisor.init = function() {
        showPwd.fixPage(3000);
        addDOMListener();
    };

    function addDOMListener() {
        MutationObserver = window.MutationObserver;
        let observer = new MutationObserver(function(mutations, observer) {
            showPwd.fixPage(3000);
        });
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, showPwd));

