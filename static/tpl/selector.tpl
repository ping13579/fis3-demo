<div id="{{id}}" class="selectorBox">
    <div class="d-main">
        <div class="d-header">
            <a class="func-btn okBtn" href="javascript:void(0)">确定</a>
            <h1>{{title}}</h1>
            <a class="func-btn cancelBtn" href="javascript:void(0)">取消</a>
        </div>
        <div class="s-mark"></div>
        <div class="scrollContent {{type}}">
            <div id="YScroll" class="scroll-item scroll-col-1">
                <ul>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    {{#each data}}
                    <li data-val="{{value}}" data-name="{{name}}">{{name}}</li>
                    {{/each}}
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                </ul>
            </div>
        </div>
    </div>
</div>'