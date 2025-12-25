<?php
session_start();

/* Redirect if not logged in */
if (!isset($_SESSION["user_id"])) {
  header("Location: auth/login.php");
  exit;
}

/* Initialize cart */
if (!isset($_SESSION["cart"])) {
  $_SESSION["cart"] = [];
}

/* Remove item */
if (isset($_GET["remove"])) {
  unset($_SESSION["cart"][$_GET["remove"]]);
  header("Location: cart.php");
  exit;
}

/* Update quantity */
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["update_cart"])) {
  foreach ($_POST["qty"] as $key => $qty) {
    $_SESSION["cart"][$key]["qty"] = max(1, (int)$qty);
  }
}

/* Product catalog (temporary – later from DB) */
$products = [
  "protein" => ["name" => "Protein Powder", "price" => 49.99],
  "bands" => ["name" => "Resistance Bands", "price" => 24.99],
  "yoga-mat" => ["name" => "Yoga Mat", "price" => 39.99]
];

/* Add to cart */
if (isset($_GET["add"]) && isset($products[$_GET["add"]])) {
  $key = $_GET["add"];
  if (isset($_SESSION["cart"][$key])) {
    $_SESSION["cart"][$key]["qty"]++;
  } else {
    $_SESSION["cart"][$key] = [
      "name" => $products[$key]["name"],
      "price" => $products[$key]["price"],
      "qty" => 1
    ];
  }
  header("Location: cart.php");
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Cart | Fusion FitNet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>

<header>
  <h1>Your Cart</h1>
  <p class="tagline">Review your selected items</p>
</header>

<section>
<?php if (empty($_SESSION["cart"])): ?>
  <p>Your cart is empty.</p>
  <a href="index.php#products" class="btn">Shop Now</a>

<?php else: ?>
<form method="POST">
  <table style="width:100%; border-collapse: collapse;">
    <tr>
      <th align="left">Product</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total</th>
      <th></th>
    </tr>

<?php
$grandTotal = 0;
foreach ($_SESSION["cart"] as $key => $item):
  $total = $item["price"] * $item["qty"];
  $grandTotal += $total;
?>
    <tr>
      <td><?= htmlspecialchars($item["name"]) ?></td>
      <td>$<?= number_format($item["price"], 2) ?></td>
      <td>
        <input type="number" name="qty[<?= $key ?>]" value="<?= $item["qty"] ?>" min="1" style="width:60px;">
      </td>
      <td>$<?= number_format($total, 2) ?></td>
      <td>
        <a href="cart.php?remove=<?= $key ?>" style="color:red;">✖</a>
      </td>
    </tr>
<?php endforeach; ?>

    <tr>
      <td colspan="3" align="right"><strong>Grand Total</strong></td>
      <td><strong>$<?= number_format($grandTotal, 2) ?></strong></td>
      <td></td>
    </tr>
  </table>

  <br>

  <button type="submit" name="update_cart" class="btn">Update Cart</button>
  <a href="checkout.php" class="btn">Proceed to Checkout</a>
</form>
<?php endif; ?>
</section>

<footer>
  © 2025 Fusion FitNet
</footer>

</body>
</html>
