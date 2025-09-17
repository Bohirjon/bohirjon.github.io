# Open/Closed Principle (OCP)

## What is OCP?
**Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.**	
- In practice → we use abstraction & polymorphism so that new features can be plugged in.

## Why
If it's ignored:
- Every new requirement forces us to edit old code.
- Risk of introducing bugs into working features.
- Lots of if/else or switch statements grow endlessly.
- Testing becomes difficult because changes affect many parts of the code.

## Example (C#)

```csharp
// Bad: Modifying existing code for new behavior 
•	Every new payment type → we must edit this method.

public class PaymentService
{
    public void Charge(string paymentType)
    {
        if (paymentType == "CreditCard")
        {
            Console.WriteLine("Charging credit card...");
        }
        else if (paymentType == "PayPal")
        {
            Console.WriteLine("Charging PayPal...");
        }
        else if (paymentType == "ApplePay")
        {
            Console.WriteLine("Charging ApplePay...");
        }
        else
        {
            throw new NotSupportedException("Unknown payment type");
        }
    }
}

// Good: Extending behavior without modifying existing code
public interface IPaymentMethod
{
    string Name { get; }
    void Charge();
}

public class CreditCardPayment : IPaymentMethod
{
    public string Name => "CreditCard";
    public void Charge() => Console.WriteLine("Charging credit card...");
}

public class PayPalPayment : IPaymentMethod
{
    public string Name => "PayPal";
    public void Charge() => Console.WriteLine("Charging PayPal...");
}

// PaymentFactory to create payment methods
public class PaymentFactory
{
    private readonly Dictionary<string, IPaymentMethod> _methods;

    public PaymentFactory(IEnumerable<IPaymentMethod> methods) // gets all the payment methods
    {
        _methods = methods.ToDictionary(m => m.Name, m => m, StringComparer.OrdinalIgnoreCase);
    }

    public IPaymentMethod GetPaymentMethod(string name)
    {
        if (_methods.TryGetValue(name, out var method))
            return method;

        throw new NotSupportedException($"Payment method '{name}' not supported");
    }
}

// PaymentService uses the factory
public class PaymentService
{
    private readonly PaymentFactory _factory;
    public PaymentService(PaymentFactory factory)
    {
        _factory = factory;
    }
    public void Charge(string paymentType)
    {
        var method = _factory.GetPaymentMethod(paymentType);
        method.Charge();
    }
}
```