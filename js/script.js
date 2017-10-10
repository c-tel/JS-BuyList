$(document).ready(function () {

    ["Помідори", "Сир", "Печиво"].forEach(function (t) {
        addItem(t);
    });

    $(".addbutton").click(function () {
        addItem();
    });
    $(".input-item").keypress(function (event) {
        if (event.which == 13) {
            addItem();
        }
    });


    function addItem(product) {
        var bought = true;
        var input = $(".input-item");
        var node = $($(".itemTemplate").html());
        var node1 = $($(".rightTemplate").html());
        var edit = node.find(".edit-item");
        if (!product)
            product = input.val();
        if (product.replace(/[ ]/g,"")) {
            node.find(".itemtitle").prepend(product);
            node1.find(".unittitle").text(product);
            node1.find(".counter").append(1);
            node.find(".removebutton").click(function () {
                node.remove();
                node1.remove();
            });
            node.find(".plusbutton").click(function () {
                var amount = $(node.find(".amount"));
                var count = parseInt(amount.text());
                amount.text(count + 1);
                amount = $(node1.find(".counter"));
                amount.text(count + 1);
            });
            node.find(".minusbutton").click(function () {
                var amount = $(node.find(".amount"));
                var count = parseInt(amount.text());
                if (count > 1) {
                    amount.text(count - 1);
                    amount = $(node1.find(".counter"));
                    amount.text(count - 1);
                }
            });
            node.find(".buybutton").click(function () {
                if (bought) {
                    node1.remove();
                    $(".bought-list").append(node1);
                    node.find(".plusbutton").css("visibility", "hidden");
                    node.find(".amount").css("margin-right", "9px");
                    node.find(".minusbutton").css("visibility", "hidden");
                    node.find(".removebutton").css("display", "none");
                    node.find(".itemtitle").css("text-decoration", "line-through");
                    node1.find(".unittitle").css("text-decoration", "line-through");
                    node.find(".buybutton").text("Не куплено");
                    node.find(".buybutton").attr("data-tooltip", "Видалити зі списку купленого");
                    bought = false;
                }
                else {
                    node1.remove();
                    $(".remain-list").append(node1);
                    node.find(".plusbutton").css("visibility", "visible");
                    node.find(".amount").css("margin-right", "5px");
                    node.find(".minusbutton").css("visibility", "visible");
                    node.find(".removebutton").css("display", "inline");
                    node.find(".itemtitle").css("text-decoration", "none");
                    node1.find(".unittitle").css("text-decoration", "none");
                    node.find(".buybutton").text("Куплено");
                    node.find(".buybutton").attr("data-tooltip", "Додати до списку купленого");
                    bought = true;
                }
            });
            node.find(".itemtitle").click(function () {
                if(bought) {
                    node.find(".itemtitle").hide();
                    edit.val(node.find(".itemtitle").text());
                    edit.show();
                    edit.focus();
                }
            });
            edit.focusout(function () {
                var title = edit.val();
                var res = node.find(".itemtitle").text();
                if(title)
                    res = title;
                node.find(".itemtitle").text(res);
                node1.find(".unittitle").text(res);
                edit.hide();
                node.find(".itemtitle").show();
            });

            $(".bl-list").append(node);
            $(".remain-list").append(node1);
            input.val("");
            input.attr("placeholder", "Назва товару");
        }
        input.focus();

    }
});